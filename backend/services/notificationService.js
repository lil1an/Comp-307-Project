import Notification from '../models/Notification.js';

export const getNotificationByIdFromDatabase = async (notificationId) => {
  try {
    const notification = await Notification.findById(notificationId);
    return notification || null;
  } catch (error) {
    console.error('Error fetching notification by ID:', error.message);
    throw new Error('Unable to fetch notification');
  }
};

export const createNewNotificationInDatabase = async (notification) => {
  try {
    const newNotification = await Notification.create(notification);
    return newNotification;
  } catch (error) {
    console.error('Error creating notification:', error.message);
    throw new Error('Unable to create notification');
  }
};

const notificationService = {
  getNotificationByIdFromDatabase,
  createNewNotificationInDatabase,
};

export default notificationService;