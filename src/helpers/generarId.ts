const generarId = () => {
    const random = Math.floor(Math.random() * 100000);
    const fecha = Date.now().toString().slice(-5);
    const uniqueId = (parseInt(fecha) + random).toString();
    return uniqueId.slice(-9);
  };
  
export default generarId;