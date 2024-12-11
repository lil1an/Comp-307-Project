import Notification from '../models/Notification.js';

export const getNotificationByIdFromDatabase = async (notificationId) => {
  try {
    const notification = await Notification.findById(notificationId);
    return notification || null;
  } catch (error) {
    console.error('Error fetching notification by ID:', error.message);
    throw new Error(`Unable to fetch notification with ID ${notificationId}`);
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

export const deleteNotificationFromDatabase = async (notificationId) => {
  try {
    const result = await Notification.findByIdAndDelete(notificationId);
    if (!result) {
      throw new Error(`Notification with ID ${notificationId} not found`)
    }
    return result;

  } catch (error) {
    console.error('Error deleting notification:', error);
    throw new Error(`Unable to delete notification with ID ${notificationId}`);
  }
};

export const updateNotificationInDatabase = async (notificationId, updatedData) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(notificationId, updatedData, { new: true });
    if (!updatedNotification) {
      throw new Error(`Notification with ID ${notificationId} not found`);
    }
    console.log('Updated notification:', updatedNotification);
  } catch (error) {
    console.error('Error updating notification:', error);
    throw new Error(`Unable to update notification with ID ${notificationId}`);
  }
};

export default {
  getNotificationByIdFromDatabase,
  createNewNotificationInDatabase,
  deleteNotificationFromDatabase,
  updateNotificationInDatabase
};