const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data)
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\nUpdated file');
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf8');
        console.log(newData)
    } catch (error){
        console.log(error)
    }
}
fileOps();



// // fs.readFile('files/starter.txt', 'utf8', (err, data) => {
// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })

// fs.writeFile(path.join(__dirname, 'files', 'write.txt'), 'file wrote', (err) => {
//     if (err) throw err;
//     console.log('Write Complete');

//     fs.appendFile(path.join(__dirname, 'files', 'write.txt'), '\nfile updated', (err) => {
//         if (err) throw err;
//         console.log('Append Complete');

//         fs.rename(path.join(__dirname, 'files', 'write.txt'), path.join(__dirname, 'files', 'newwrite.txt'), (err) => {
//             if (err) throw err;
//             console.log('Rename Complete');
//         })
//     })
// })