import { scheduleJob } from 'node-schedule';
import getPrices from '../services/get-prices';

const onConnection = (socket: any, io: any) => {
    console.log('a user connected');
    const fsyms = socket.handshake?.query?.['fsyms'] as string;
    const tsyms = socket.handshake?.query?.['tsyms'] as string;

    const roomId = `${tsyms}${tsyms}`;

    socket.join(roomId);

    const jobTask = async () => {
        let data = await getPrices(fsyms, tsyms);
        io.to(roomId).emit('data', data);
    };

    // this job runs very minute
    scheduleJob(roomId, '*/1 * * * *', jobTask);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
};

export default onConnection;
