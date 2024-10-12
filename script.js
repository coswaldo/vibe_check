document.getElementById("surveyForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Collect all the survey responses, including comments
    const data = {
        rating: document.getElementById("rating").value,
        annoyed: document.getElementById("annoyed").value,
        annoyedComment: document.getElementById("annoyedComment").value,
        overstay: document.getElementById("overstay").value,
        overstayComment: document.getElementById("overstayComment").value,
        offputting: document.getElementById("offputting").value,
        offputtingComment: document.getElementById("offputtingComment").value,
        music: document.getElementById("music").value,
        musicComment: document.getElementById("musicComment").value,
        sure: document.getElementById("sure").value,
        sureComment: document.getElementById("sureComment").value,
        hangoutAgain: document.getElementById("hangout_again").value,
        hangoutAgainComment: document.getElementById("hangoutAgainComment").value,
        weird: document.getElementById("weird").value,
        weirdComment: document.getElementById("weirdComment").value,
        like: document.getElementById("like").value,
        likeComment: document.getElementById("likeComment").value,
        hate: document.getElementById("hate").value,
        hateComment: document.getElementById("hateComment").value,
    };

    // Send the data to the Flask server
    fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("message").innerHTML = `
            Thank you for your feedback! Your responses have been recorded.<br>
            You can view your response later using this link: <a href="/view-response/${data.id}">View Response</a>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("message").innerText = "An error occurred while submitting the survey.";
    });
});
