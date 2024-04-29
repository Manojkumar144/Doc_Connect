
document.addEventListener('DOMContentLoaded', async function() {
    
    const response =await axios.get('/doctordetails');

    console.log("inside the doctor.js file....", response);
  
    const doctors=response.data.doctorDetails;
  const container = document.querySelector('.container');
  
  // Iterate over each doctor object
  doctors.forEach(doctor => {
    // Create a div element for each doctor
    const doctorDetailsDiv = document.createElement('div');
    doctorDetailsDiv.className = 'doctor-details';
  
    // Create an h2 element for the doctor's name
    const doctorNameHeading = document.createElement('h2');
    doctorNameHeading.textContent = doctor.name;
  
    // Create paragraph elements for availability and location
    const availabilityParagraph = document.createElement('p');
    const availabilitySpan = document.createElement('span');
    availabilitySpan.textContent = 'Availability:';
    availabilityParagraph.appendChild(availabilitySpan);
    availabilityParagraph.appendChild(document.createTextNode('5.00 PM to 9.00 PM'));
  
    const locationParagraph = document.createElement('p');
    const locationSpan = document.createElement('span');
    locationSpan.textContent = 'Location:';
    locationParagraph.appendChild(locationSpan);
    locationParagraph.appendChild(document.createTextNode('Chennai'));
  
    // Create a button element for booking appointment
    const bookAppointmentButton = document.createElement('button');
    bookAppointmentButton.className = 'btn';
    bookAppointmentButton.textContent = 'Book Appointment';

    bookAppointmentButton.setAttribute('data-doctor-id', doctor.id);

    bookAppointmentButton.addEventListener('click', handleBookAppointment);
  
    // Append all elements to the doctor-details div
    doctorDetailsDiv.appendChild(doctorNameHeading);
    doctorDetailsDiv.appendChild(availabilityParagraph);
    doctorDetailsDiv.appendChild(locationParagraph);
    doctorDetailsDiv.appendChild(bookAppointmentButton);
  
    // Append the doctor-details div to the container
    container.appendChild(doctorDetailsDiv);
  });
  
  
  function handleBookAppointment(event) {
    // Retrieve doctor ID and availability from the button's data attributes
    const doctorId = event.target.getAttribute('data-doctor-id');
    // Redirect to the page with slots timing available, passing doctor ID and availability
    window.location.href = `/slots?doctorId=${doctorId}`;
}
  });

