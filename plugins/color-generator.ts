export default defineNuxtPlugin((nuxtApp) => {
  const generateRandomColors = () => {
    const code = '0123456789ABCDEF'
    let color = '#'

    for (let x = 0; x < 6; x++) {
        color += code[Math.floor(Math.random() * 16)]
    }

    return color
  }
  
  return {
    provide: {
      generateRandomColors
    },
  };
});