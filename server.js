const express = require("express")
const { exec } = require("child_process")
const app = express()
var ip =(exec('curl http://checkip.amazonaws.com'))
        console.log(`${ip}`)

app.get("/runform", (req, res) => {
	res.sendFile( __dirname + '/index.html');
})
app.get("/run", (req,res) => {
	const cname = req.query.cname;
       	const cimg = req.query.cimg;
	exec('sudo docker run -dit --name ' + cname + " "  + cimg ,(err, stdout, stderr) => {
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
		res.send("<pre> Launched Successfully ...." + stdout + "</pre>");
	})
})
app.get("/ps", (req,res) => {
exec("docker ps | tail -n +2" , (err, stdout, stderr)=> {
        let a = stdout.split("\n");
        res.write("<table border='5'   width='100%'>");
        res.write("<tr><th>Container ID</th><th>Image Name</th><th>Command</th><th>Container Name</th></tr>");
        a.forEach( ( cdetails ) => {
                cinfo = cdetails.trim() .split(/\s+/)
                console.log(cinfo[0] + " " + cinfo[1] + " " + cinfo[2])
                res.write("<tr>" + "<td>" + cinfo[0] + "</td>" + "<td>" + cinfo[1] + "</td>" + "<td>" + cinfo[2] + "</td>" +
                "<td>" + cinfo[ cinfo.length - 1 ] + "</td>" + "</tr>")
                })
        res.write("</table>")
        res.send()
        //res.send("<pre>" + stdout + "</pre>");
})
})
app.get("/psall", (req,res) => {
exec("docker ps -a | tail -n +2" , (err, stdout, stderr)=> {
        let a = stdout.split("\n");
        res.write("<table border='5'   width='100%'>");
        res.write("<tr><th>Container ID</th><th>Image Name</th><th>Command</th><th>Container Name</th></tr>");
        a.forEach( ( cdetails ) => {
                cinfo = cdetails.trim() .split(/\s+/)
                console.log(cinfo[0] + " " + cinfo[1] + " " + cinfo[2])
                res.write("<tr>" + "<td>" + cinfo[0] + "</td>" + "<td>" + cinfo[1] + "</td>" + "<td>" + cinfo[2] + "</td>" +
                "<td>" + cinfo[ cinfo.length - 1 ] + "</td>" + "</tr>")
                })
        res.write("</table>")
        res.send()
        //res.send("<pre>" + stdout + "</pre>");
})
})

app.get("/delete", (req,res) => {
        const cd = req.query.cid;
        exec('sudo docker rm -f ' + " " + cd ,(err, stdout, stderr) => {
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                res.send("<pre>  Successfully Deleted ...." + stdout + "</pre>");
        })
})
app.get("/stop", (req,res) => {
        const cd = req.query.cid;
        exec('sudo docker stop' + " " + cd ,(err, stdout, stderr) => {
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                res.send("<pre>  Successfully Stopped ...." + stdout + "</pre>");
        })
})



app.listen(3001, () => { console.log("container app tool started ....")})
