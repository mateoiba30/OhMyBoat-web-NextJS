export async function getServerSideProps(context) {
    const { req } = context;
    const currentUrl = `${req.url}`;
    console.log(currentUrl);
    
    // Resto del código...
  }
  