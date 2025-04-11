// Exercise: determine what is the order of logs printed into the console.
// There is no guarantee that an exact number of milliseconds will pass 
// because the callback function is executed when the browser is idle 
// (in the meantime).
// Because of that, we can even put 0 as the number of milliseconds.

console.log("Hi!");

setTimeout(function() {
  console.log("Some time passed");	
}, 0);

console.log("Bye!");

// Output: 
// Hi!
// Bye!
// Some time passed
//-----------------------------------------------------------------------------

// Exercise: write the code that simulates loading messages:

// Loading...
// 25% loaded...
// 50% loaded...
// 75% loaded...
// Loading complete

function simulateLoading() {
    const messages = [
        "Loading...",
        "25% loaded...",
        "50% loaded...",
        "75% loaded...",
        "Loading complete"
    ];
    messages.forEach((message, index) => {
        setTimeout(() => {
            console.log(message);
        }, index * 1000);
    });
}

simulateLoading();

// Exercise: write the code that simulates loading messages using promises

function delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function simulateLoading() {
    console.log("Loading...");
    delay(1000)
        .then(() => {
            console.log("25% loaded...");
            return delay(1000);
        })
        .then(() => {
            console.log("50% loaded...");
            return delay(1000);
        })
        .then(() => {
            console.log("75% loaded...");
            return delay(1000);
        })
        .then(() => {
            console.log("Loading complete");
        });
}

simulateLoading();

// better solution with cleaner approach
function delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function simulateLoading() {
    console.log("Loading...");
    await delay(1000);
    
    console.log("25% loaded...");
    await delay(1000);
    
    console.log("50% loaded...");
    await delay(1000);
    
    console.log("75% loaded...");
    await delay(1000);
    
    console.log("Loading complete");
}

simulateLoading();

// Exercise: write the waitForButtonToBeClicked function

function waitForButtonToBeClicked(selector) {
    return new Promise(resolve => {
        const button = document.querySelector(selector);
        if (!button) {
            throw new Error(`No element found for selector: ${selector}`);
        }

        button.addEventListener("click", () => {
            resolve("The button was clicked");
        });
    });
}

waitForButtonToBeClicked("#my-button")
  .then(function(message) {
    console.log(message); // The button was clicked
  })

//   Exercise: use the prompt() function to ask how long the user wants to wait. 
// Use catch to log a message if they provided an incorrect time.

const message = new Promise((resolve, reject) => {
    const time = prompt("How long do You want to wait? Provide answer in miliseconds");
    const timeNumber = Number(time);
    if (isNaN(timeNumber) || time <= 0) {
        reject("The time should be a positive number")
    } else {
        alert(`You will wait ${time} ms`)
        resolve();
    }
});

message.catch(message => {
    console.log(message);
})

// Exercise: use the prompt() function to ask how long the user wants to wait. Use finally 
// to log a message regardless of whether they provided the correct time or not.

const message = new Promise((resolve, reject) => {
    const time = prompt("How long do You want to wait? Provide answer in miliseconds");
    const timeNumber = Number(time);
    if (isNaN(timeNumber) || time <= 0) {
        reject("The time should be a positive number")
    } else {
        alert(`You will wait ${time} ms`)
        resolve();
    }
});

message
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("This runs no matter what");
  });

// Exercise: use the prompt() function to ask how long the user wants to wait.
// Use then to wait for the appropriate time. Use catch to log a message if 
// they provided an incorrect time. Use finally to log a message whether or not
// the promise is fulfilled or rejected

const message = new Promise((resolve, reject) => {
    const inputTime = prompt("How long do You want to wait? Provide answer in miliseconds");
    const time = Number(inputTime);

    if (isNaN(time) || time <= 0) {
        reject("The time should be a positive number.");
      } else {
        setTimeout(() => {
            resolve(`Waited for ${time} ms`);
        }, time);
      }
});

message
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.error("Error", error);
    })
    .finally(() => {
        console.log("Timer finished running.");
    });

// Exercise: write the code that simulates loading messages using chained promises

// Loading...
// 25% loaded...
// 50% loaded...
// 75% loaded...
// Loading complete

function delay(miliseconds, message) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(console.log(message));
        }, miliseconds)
    })
}

delay(500, "Loading...")
  .then(() => delay(500, "25% loaded..."))
  .then(() => delay(500, "50% loaded..."))
  .then(() => delay(500, "75% loaded..."))
  .then(() => delay(500, "Loading complete"));