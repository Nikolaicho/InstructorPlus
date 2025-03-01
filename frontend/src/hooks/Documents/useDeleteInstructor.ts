const useDeleteInstructor = () => {
  const deleteInstructor = (data: any) => {
    fetch("http://localhost:8000/deleteInstructor", {
      method: "POST",
      body: JSON.stringify({
        data: data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return { deleteInstructor };
};

export default useDeleteInstructor;
