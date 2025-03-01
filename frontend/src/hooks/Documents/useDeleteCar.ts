const useDeleteCar = () => {
  const deleteCar = (data: any) => {
    fetch("http://localhost:8000/deleteCar", {
      method: "POST",
      body: JSON.stringify({
        data: data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return { deleteCar };
};
export default useDeleteCar;
