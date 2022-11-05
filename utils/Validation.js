const dateFormat = new RegExp(/^[\d]{4}-[\d]{2}-[\d]{2}\s{1}[\d]{2}:[\d]{2}$/);
const docNameFormat = new RegExp(/^[A-z ]{3,}$/);

const validDate = (dateString) => dateFormat.test(dateString) && !Number.isNaN(Date.parse(dateString));
const validDocName = (docName) => docNameFormat.test(docName);

module.exports = {
    validDate,
    validDocName
}