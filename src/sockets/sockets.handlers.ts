import { scheduledJobs, scheduleJob } from 'node-schedule';
import getPrices from '../services/get-prices';

const onConnection = (socket: any, io: any) => {
    console.log('a user connected');
    const fsyms = socket.handshake?.query?.['fsyms'] as string;
    const tsyms = socket.handshake?.query?.['tsyms'] as string;

    socket.join(socket.id);

    const jobTask = async () => {
        let data = await getPrices(fsyms, tsyms);
        io.to(socket.id).emit('data', data);
    };

    // this job runs very minute
    scheduleJob(socket.id, '*/1 * * * *', jobTask);

    socket.on('disconnect', () => {
        console.log('user disconnected');
        scheduledJobs[socket.id]?.cancel();
    });
};

export default onConnection;
