/**
 * @file A file for handling user interaction
 * @author Yu-Hsun Yuan <steven112163@gmail.com>
 */


//--------------------------------------------------------
/**
 * Submit query to server side
 * @param {String} Id ID of textarea of submitted query
 */
function submitQuery(Id) {
    let query = document.getElementById(Id).value;
    if (query == "")
        query = document.getElementById(Id).placeholder;
    console.log(query);
    $.get("queryHandle.js",
        {
            problemNumber: Id[Id.length - 1],
            query: query
        },
        function (data, status, xmlHttpRequest) {
            if (status == "success") {
                printResult(Id[Id.length - 1], data);
            } else if (status == "error") {
                alert(status);
                alert(xmlHttpRequest);
            }
        });
}


//--------------------------------------------------------
/**
 * Output query results in the table
 * @param {String} Id ID of textarea of submitted query
 * @param {String} data Data of queried results
 */
function printResult(Id, data) {
    try {
        let objData = JSON.parse(data);
        console.log(objData);
        let keys = Object.keys(objData[0]);
        let table = "<table><tr>";

        for (let key of keys)
            table += "<th>" + key + "</th>";
        table += "</tr>";

        for (let eachData of objData) {
            table += "<tr>";
            for (let key of keys)
                table += "<td>" + eachData[key] + "</td>";
            table += "</tr>";
        }
        table += "</table>";
        console.log(table);
        console.log(Id);

        document.getElementById("t" + Id).innerHTML = table;
    } catch (err) {
        throw err;
    }

}