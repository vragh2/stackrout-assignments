 function createForm(repo) {
	document.getElementById("repoName").innerHTML = repo;
	document.getElementById("issueWrapper").style.display="block";
}
function createANewIssue() {
	const { innerHTML } = document.getElementById("repoName");
	const title = document.getElementById('issueLabel').value;
	const body = document.getElementById('issueMessage').value;
	fetch(`https://api.github.com/repos/vishaka27/${innerHTML}/issues`, {
		method: "post",
		headers: {
			"Authorization": "token 09163fdb59f245ee2575f78bdd7792c99fb62fcb"
		},

		//make sure to serialize your JSON body
		body: JSON.stringify({ title, body })
		})
		.then((res) => { 
		res.json().then(data => {
			console.log(data);
			document.getElementById("successMessage").innerHTML = 'Issue has been created';
			document.getElementById("successMessage").style.display="block";
			document.getElementById("issueWrapper").style.display="none";
		}).catch(e => {
			document.getElementById("successMessage").innerHTML = 'Opps! something went wrong';
			console.log(e);
		})
	});
}

function getRepo () {
	const userName = document.getElementById('vimalForm');
	fetch(`https://api.github.com/users/${userName.value}/repos`, {headers: {
        "User-Agent": "09163fdb59f245ee2575f78bdd7792c99fb62fcb"  // Your Github ID or application name
    }}).then(data => data.json().then(data => {
		const elements = data.map((item,index) => `<div style="display:flex; justify-content: space-between;"><li style="list-style: none;" class="col-5">
			${index+1}&nbsp;&nbsp;${item.full_name.split('/')[1]}</li> 
			<input type="button" class="newIssue" onclick="createForm('${item.full_name.split('/')[1]}')" 
			value="New Issue"></div>`)
		document.getElementById('content').innerHTML = elements;
		document.getElementById('user').innerHTML = "List of" + '&nbsp;' + userName.value + '&nbsp;' +"repositories";
	}));
}
