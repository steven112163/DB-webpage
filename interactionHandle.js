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
    if(query == "")
        query = document.getElementById(Id).placeholder;
    console.log(query);
    $.get("queryHandle.js",
        {
            query: query
        },
        function (data, status, xmlHttpRequest) {
            if (status == "success") {
                printResult(Id, data);
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
 * @param {Object} data Data of queried results
 */
function printResult(Id, data) {
    console.log(data);
}