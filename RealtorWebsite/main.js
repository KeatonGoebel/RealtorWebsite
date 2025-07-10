// page is either index.html or listings.html
const path = window.location.pathname;
const page = path.substring(path.lastIndexOf('/') + 1)
console.log("Current page: ", page)

// Changing tabs on click
document.getElementById('Home').addEventListener('click', () => {
    window.location.href = 'index.html'
    console.log(page)

});

document.getElementById('Listings').addEventListener('click', () => {
    window.location.href = 'listings.html'
    console.log(page)
});

// make sure you check if seeListings exists before you use it as it does not exist on listings.html
const seeListings = document.getElementById('seeListings');
if(seeListings){
seeListings.addEventListener('click', () => {
    window.location.href = 'listings.html'
    console.log(page)
});
}

// Changing button color based on the current page
if(page == "index.html"){
    const button = document.getElementById('Home')
    button.style.color = "lightskyblue"
}

if(page == "listings.html"){
    const button = document.getElementById('Listings')
    button.style.color = "lightskyblue"
}

// Programming schedule drop down menu
const schedule = {
    Sunday: "By Appointment",
    Monday: "09:00 am - 05:00 pm",
    Tuesday: "09:00 am - 05:00 pm",
    Wednesday: "09:00 am - 05:00 pm",
    Thursday: "09:00 am - 05:00 pm",
    Friday: "09:00 am - 05:00 pm",
    Saturday: "By Appointment"
};

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const todayIndex = new Date().getDay();
const today = days[todayIndex];
let isToggled = false;

const currentDay= document.getElementById("currentDay");
const scheduleText = document.getElementById("schedule");

currentDay.textContent = `${today}: ${schedule[today]}`;

showSchedule.addEventListener("click", () => {
    isToggled = !isToggled;
    console.log(isToggled);

if(isToggled){
    const message = document.createElement("p");
    message.innerHTML = `Sunday: By Appointment <br>
    Monday: 09:00 am - 05:00 pm <br>
    Tuesday: 09:00 am - 05:00 pm <br>
    Wednesday: 09:00 am - 05:00 pm <br>
    Thursday: 09:00 am - 05:00 pm <br>
    Friday: 09:00 am - 05:00 pm <br>
    Saturday: By Appointment`;
    message.id = "toggleMessage";
    scheduleText.appendChild(message)
    console.log("test")
    console.log(message.textContent)

} else {
    const message = document.getElementById("toggleMessage");
    if(message) {
        scheduleText.removeChild(message)
    }
}
});
