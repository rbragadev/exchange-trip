async function main() {
  console.log('Seed is empty for now.');
}

main()
  .then(() => console.log('Seed finished.'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
