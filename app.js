const gqlApiEndpoint = 'http://localhost:3000/graphql';

function updateContainerStatus(){
    axios.post(gqlApiEndpoint, {
        query: `
        query{
            status
        }`
    }).then(response => {
        const containerStatusElement = document.getElementById('containerStatus');
        containerStatusElement.innerText = `Container Status: ${response.data.data.status}`; // Use backticks (`) for template literals
    }).catch(error => {
        console.error('Error fetching container status:', error);
    });
}

function spinUpContainer(){
    axios.post(gqlApiEndpoint, {
        query: `
        mutation {
            spinUpContainer {
                status
                message
            }
        }
        `
    })
    .then(response => {
        alert(response.data.data.spinUpContainer.message);
        updateContainerStatus();
    })
    .catch(error => {
        console.error('Error spinning up container: ', error);
    });
}

function spinDownContainer() {
    axios.post(gqlApiEndpoint, {
        query: `
        mutation {
            spinDownContainer {
                status
                message
            }
        }
        `
    }).then(response => {
        alert(response.data.data.spinDownContainer.message);
        updateContainerStatus();
    }).catch(error => {
        console.error('Error spinning down container: ', error);
    });
}

updateContainerStatus();