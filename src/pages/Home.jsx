import { useState } from "react";
function Home() {
    const [angle, setAngle] = useState(120); // Set initial angle to 120 degrees

    function calculateClockAngle() {

        // const timeInput1 = "03:15";
        // const timeInput2 = "05:45";
        const timeInput1 = document.getElementById("startTime").value
        const timeInput2 = document.getElementById("endTime").value
        if (!timeInput1 || !/^\d{2}:\d{2}$/.test(timeInput1) ||
            !timeInput2 || !/^\d{2}:\d{2}$/.test(timeInput2)) {
            console.error("Invalid time format. Please enter both times in HH:MM format.");
            return;
        }

        const [hours1, minutes1] = timeInput1.split(':').map(Number);
        const [hours2, minutes2] = timeInput2.split(':').map(Number);

        if (hours1 > 23 || minutes1 > 59 || hours2 > 23 || minutes2 > 59) {
            console.error("Invalid time. Hours should be 0-23 and minutes 0-59.");
            return;
        }

        // Function to calculate the angle between hour and minute hands for a given time
        function calculateAngle(hours, minutes) {
            const hourIn12HourFormat = hours % 12;
            const hourAngle = (hourIn12HourFormat * 30) + (minutes * 0.5);
            const minuteAngle = minutes * 6;
            let angleDifference = hourAngle - minuteAngle;
            if (angleDifference < 0) {
                angleDifference += 360; // Adjust to positive angle in clockwise direction
            }
            return angleDifference;
        }

        // Calculate angles for both times
        const angle1 = calculateAngle(hours1, minutes1);
        const angle2 = calculateAngle(hours2, minutes2);

        // Calculate the clockwise difference between the two angles
        let angleDifferenceBetweenTimes = angle2 - angle1;
        if (angleDifferenceBetweenTimes < 0) {
            angleDifferenceBetweenTimes += 360; // Ensure the angle is positive
        }

        console.log(`Difference in Angles Between '${timeInput1}' and '${timeInput2}': ${angleDifferenceBetweenTimes.toFixed(2)}°`);

        setAngle(angleDifferenceBetweenTimes.toFixed(2))
    }
    const angleInRadians = (angle * Math.PI) / 180;

    // Calculate the (x, y) coordinates of the point on the circle corresponding to the angle
    const x = 50 + 50 * Math.cos(angleInRadians - Math.PI / 2); // Center is (50, 50)
    const y = 50 + 50 * Math.sin(angleInRadians - Math.PI / 2);

    // Determine if the large arc flag is needed (for angles > 180°)
    const largeArcFlag = angle > 180 ? 1 : 0;

    // SVG path for the circle segment
    const pathData = `
          M 50,50
          L 50,0
          A 50,50 0 ${largeArcFlag} 1 ${x},${y}
          Z
        `;

    return (
        <>

            <input type="time" id="startTime" />
            <input type="time" id="endTime" />
            <button onClick={calculateClockAngle}>Calculate Clock Angle</button>



            <div style={{ textAlign:"center"}}>
                <h2>Circle Segment of {angle}°</h2>
                <svg width="200" height="200" viewBox="0 0 100 100">
                    <path d={pathData} fill="orange" />
                    <circle cx="50" cy="50" r="50" fill="none" stroke="gray" strokeWidth="0.5" />
                </svg>

            </div>
        </>
    );
}

export default Home;
