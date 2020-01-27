import React from 'react'

class FortyTips extends React.Component {
    render(){
        const fs = require("fs");
        fs.readFile('fortytips.txt', 'utf-8', (err, data) => {
            if (err) throw err;
            console.log(data);
        }) 
        // text = text.map(line => (
        //     <>
        //     line <br/>
        //     </>
        // ))
        return (
        <>
        <h1>40 Tips for Rock Climbing</h1>
        {/* {text} */}
        </>
        )
    }
}

export default FortyTips