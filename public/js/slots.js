document.addEventListener('DOMContentLoaded', async function() {
    const slotList = document.getElementById('slot-list');
  
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('doctorId');
    console.log("Inside the Doctors page... doctor id :", id);

    const response = await axios.get(`/slotdetails/${id}`);

    console.log("Inside the response slot... response...", response.data.slotDetails);

    const slots = response.data.slotDetails;

    const heading= document.createElement('h3');
    heading.textContent=`Available slots for Doctor ${response.data.doctorDetail.name}`;
    slotList.appendChild(heading);


    // Create slot elements
    slots.forEach(slot => {
      const slotDiv = document.createElement('div');
      slotDiv.className = 'slot';
  
      const slotTime = document.createElement('span');
      slotTime.textContent = slot.timeSlot; 
  
      const bookButton = document.createElement('button');
      bookButton.textContent = 'Book';
      bookButton.className = 'btn';
      bookButton.addEventListener('click', function() {
        bookSlot(slot);
      });
  
      slotDiv.appendChild(slotTime);
      slotDiv.appendChild(bookButton);
      slotList.appendChild(slotDiv);
    });
  
    // Function to book the slot
    function bookSlot(slot) {
     const token = localStorage.getItem('accessToken');
   
      axios.post('/bookslot',slot,{ headers: {"Authorization" : token} });
      alert('Slot booked Successfully!');
    }
  });
  