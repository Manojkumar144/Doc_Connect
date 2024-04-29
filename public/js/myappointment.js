document.addEventListener('DOMContentLoaded', async function() {
    

    const token = localStorage.getItem('accessToken');
    const response = await axios.get('/appointment',{ headers: {"Authorization" : token} });
    console.log("appointment response....", response.data);
    const appointment = response.data.appointmentDetails;
    const doctorDetail = response.data.doctorDetail;

    const appointmentList = document.querySelector('.appointment-list');

    // Create appointment container
    const appointmentDiv = document.createElement('div');
    appointmentDiv.classList.add('appointment');

    // Create doctor name element
    const doctorName = document.createElement('p');
    doctorName.textContent = `${doctorDetail.name}`;

    // Create appointment time element
    const appointmentTime = document.createElement('p');
    appointmentTime.textContent = `${appointment.appointmentTime}`;

    // Create cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add('btn-cancel');
    cancelButton.addEventListener('click', function() {
        // Handle cancel button click event
        cancelAppointment(appointment);
    });

    // Append elements to appointment container
    appointmentDiv.appendChild(doctorName);
    appointmentDiv.appendChild(appointmentTime);
    appointmentDiv.appendChild(cancelButton);

    // Append appointment container to the list
    appointmentList.appendChild(appointmentDiv);
});

async function cancelAppointment(appointment) {
    const token = localStorage.getItem('accessToken');
    const response =await axios.post('/cancelappointment',appointment,{ headers: {"Authorization" : token} });
    if(response.status==200){
    alert('Appointment canceled Successfully!..');
    window.location.href='/myappointment.html'
}

}
