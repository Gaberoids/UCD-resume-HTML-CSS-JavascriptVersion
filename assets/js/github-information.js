// function to display data on the screen
function userInformationHTML(user) {
    return `<h2>${user.name} <span class="small-name">(@<a href="${user.html_url}" target="_blank">${user.login}</a>)</span></h2>
    <div class="gh-content">
        <div class="gh-avatar">
            <a href="${user.html_url}" target="_blank">
            <img src="${user.avatar_url}" width="80" alt="${user.login}" />
        </div>
        <p>Followers: ${user.followers} - Following:${user.following} <br> Repos: ${user.public_repos}</p>
    </div>`;
}

// function to display data on the screen
function repoInformationHTML(repos) {//(repos) is actually somethig that github returns as an array
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }
    
    //if repoInformationHTML return value
    var listItemsHTML = repos.map(function(repo) { //repo is an array
        return `<li>
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </li>`;
    });
    return `<div class="clearfix repo-list">
            <p>
                <strong>Repo List: </strong>
            </p>
            <ul>
                ${listItemsHTML.join("\n")};
            </ul>
        </div>` //join will iterate all items in the array listItemsHTML.join("...")
}


function fetchGitHubInformation(event) {

    $("#gh-user-data").html("");// clear the divs after rendering on the page
    $("#gh-repo-data").html("");

    var username = $("#gh-username").val(); //val() is the value of the field selected.
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }

    //animated loader
    $("#gh-user-data").html(`<div id="loader"><img src="assets/css/loader.gif" alt="loading..." /></div>`);

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)//list repositories for the individual user
    ).then(
        //function(response){ //response is the outcome from the getJSON() above
        function(firstResponse, secondResponse){ //there should be a response to each JSON call, lines 25, 26. fistResponse and secondResponse

            var userData = firstResponse[0];//when "when" has two JSON calls, he packs the data in Arrays. each value is the first item of the array
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        }, function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html('<h2>No info found for the user ${username}</h2>');
            } else if (errorResponse.status === 403) {//against frotting = too many calls in the api at given time. This else if wont prevent you from getting the error but it will show a nice message to let you know. 403 is forbidden error
                var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset')*1000);//x-rate... is the name of the header that contain the information when wwe can use the functionality again. The data in this header is in a weird format, for this reason we multiply for 1000 and turn into a date format
                $("#gh-user-data").html(`<h4>Toomany requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
            } else {
                console.log(errorResponse)
                $("#gh-user-data").html("<h2>Error: ${errorResponse.responseJSON.message}</h2>")
            }

        }
    )
}

$(document).ready(fetchGitHubInformation);