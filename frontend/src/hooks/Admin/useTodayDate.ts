//за да може да се съобразим с ISO формата на parseDate() на defaultValue пропърти
//трябва да е във формат 2024-09-01
const todayDate = () => {
    let today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
}
export default todayDate