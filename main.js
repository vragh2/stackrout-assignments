function getData(url) {
	return new Promise((resolve, reject) => {
	const req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.onload = () => req.status === 200 ? resolve(req.response) : reject(req.statusText);
	req.send();
	});
} 
function createForm() {
	document.getElementById("issueForm").style.display="block";
}
function submitForm () {
	document.getElementById("issueForm").style.display="none";
}
function getRepo () {
	const userName = document.getElementById('vimalForm');
	getData(`https://api.github.com/users/${userName.value}/repos`)
	.then(data => {
		const parsedData = JSON.parse(data);
		const elements = parsedData.map((item,index) => `<div style="display:flex; justify-content: space-between;"><li style="list-style: none;" class="col-5">
			${index+1}&nbsp;&nbsp;${item.full_name.split('/')[1]}</li> 
			<input type="button" class="newIssue" onclick="createForm()" 
			value="New Issue"></div>`)
		document.getElementById('content').innerHTML = elements;
		document.getElementById('user').innerHTML = "List of" + '&nbsp;' + userName.value + '&nbsp;' +"repositories";
	});
}
