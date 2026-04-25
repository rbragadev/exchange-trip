.PHONY: help up down build logs api mobile admin install setup seed db-reset db-push

help: ## Mostra os comandos disponíveis
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

# ─── Docker ─────────────────────────────────────────────────────
up: ## Sobe postgres + API via Docker (com seed automático)
	docker compose up -d --build

down: ## Para e remove os containers
	docker compose down

build: ## Rebuilda a imagem da API
	docker compose build api

logs: ## Mostra logs da API em tempo real
	docker compose logs -f api

# ─── Desenvolvimento local ─────────────────────────────────────
install: ## Instala todas as dependências
	npm install

api: ## Inicia a API em modo watch (dev local)
	@if grep -Eq '^[[:space:]]*model[[:space:]]+[A-Za-z_][A-Za-z0-9_]*' packages/database/prisma/schema.prisma; then \
		cd packages/database && npx prisma generate --schema prisma/schema.prisma; \
	else \
		echo "⏭️  Pulando prisma generate: nenhum model definido em packages/database/prisma/schema.prisma"; \
	fi
	cd apps/api && npm run dev

mobile: ## Inicia o Expo (mobile)
	@if [ -f apps/mobile/package.json ]; then \
		cd apps/mobile && npx expo start; \
	else \
		echo "⚠️  apps/mobile não é um projeto Expo ainda (faltando apps/mobile/package.json)."; \
		echo "   Crie com: npx create-expo-app apps/mobile"; \
		echo "   ou atualize o Makefile para apontar para o diretório certo."; \
		exit 1; \
	fi

admin: ## Inicia o painel admin Next.js (porta 3001)
	@if [ -f apps/admin/package.json ]; then \
		cd apps/admin && npm run dev; \
	else \
		echo "⚠️  apps/admin não tem package.json (painel admin ainda não existe aqui)."; \
		echo "   Crie com: npx create-next-app apps/admin"; \
		exit 1; \
	fi

# ─── Banco de dados ─────────────────────────────────────────────
db-reset: ## Zera o schema public do banco local (dev)
	docker compose exec -T db psql -U app -d app_local -c "DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO app; GRANT ALL ON SCHEMA public TO public;"

db-push: ## Reseta o banco e aplica o schema sem migrations (dev)
	@if grep -Eq '^[[:space:]]*model[[:space:]]+[A-Za-z_][A-Za-z0-9_]*' packages/database/prisma/schema.prisma; then \
		cd packages/database && DATABASE_URL=postgresql://app:app@localhost:5432/app_local npx prisma db push --schema prisma/schema.prisma --force-reset; \
	else \
		echo "⏭️  Pulando prisma db push: nenhum model definido em packages/database/prisma/schema.prisma"; \
	fi

seed: ## Sempre zera e aplica tudo + popula o banco
	$(MAKE) db-reset
	$(MAKE) db-push
	cd packages/database && DATABASE_URL=postgresql://app:app@localhost:5432/app_local npm run db:seed

# ─── Setup inicial ─────────────────────────────────────────────
setup: install ## Setup completo: deps + docker + schema + seed (api + admin)
	@echo "\n>>> Subindo banco de dados..."
	docker compose up -d db
	@echo ">>> Aguardando postgres ficar pronto..."
	@until docker compose exec db pg_isready -U app -d app_local > /dev/null 2>&1; do sleep 1; done
	@echo ">>> Aplicando schema + seed..."
	$(MAKE) seed
	@echo "\n✓ Setup concluído!"
	@echo "  → make api    para iniciar o backend"
	@echo "  → make mobile para iniciar o mobile"
