
const useAuth = () => {
  async function Register(data:any) {
    const response = await fetch("http://localhost:8000/register ", {
      method: "POST",
      body: JSON.stringify({
        data:data
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }
  return {Register};
}
export default useAuth;