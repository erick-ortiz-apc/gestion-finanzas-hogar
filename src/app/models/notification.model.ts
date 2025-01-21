export interface Notification {
    message: string;
    type: 'info' | 'warning' | 'error';
    date: Date;
}