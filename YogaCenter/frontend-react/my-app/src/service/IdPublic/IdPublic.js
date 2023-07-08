export const guestNotification = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
export const staffNotification = 'dab31fb0-0078-490b-a76f-e4142948ca8a';

export default function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}