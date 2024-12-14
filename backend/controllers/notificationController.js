import notificationService from '../services/notificationService.js';
import Notification from '../models/Notification.js';

export const getNotificationById = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notificationData = await notificationService.getNotificationByIdFromDatabase(notificationId);

    if (!notificationData) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json(notificationData);
  } catch (error) {
    console.error('Error getting notification by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createNewNotification = async (req, res) => {
  try {
    const notification = req.body;
    const notificationData = await notificationService.createNewNotificationInDatabase(notification);

    res.status(201).json(notificationData);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    await notificationService.deleteNotificationFromDatabase(notificationId);

    res.status(204).json();
  } catch (error) {
    console.error(`Error deleting notification with ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const updatedNotification = req.body;
    const notificationData = await notificationService.updateNotificationInDatabase(notificationId, updatedNotification);

    res.status(204).json(notificationData);
  } catch (error) {
    console.error('Error updating notification in database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getNotificationListByUserId = async (req, res) => {
  try {
    const userId = req.body.id;

    if(!userId){
      return res.status(400).json({ message: 'No user ID!' });
    }

    const userNotificationsId = await Notification.find({users:userId});

    if(!userNotificationsId || userNotificationsId.length === 0){
      return res.status(404).json({ message: 'No notifications returned!' })
    }

    // Preparing a list to append notification content.
    const userNotifications = [];

    for(const notificationId of userNotificationsId ){
      const notificationData = await notificationService.getNotificationByIdFromDatabase(notificationId);

      // Appending only if notification was found
      if(notificationData){
        userNotifications.push(notificationData);
      }
    }

    res.status(200).json(userNotifications);
  } catch (error) {
    console.error('Error getting notification for user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default {
  getNotificationById,
  createNewNotification,
  deleteNotification,
  updateNotification,
  getNotificationListByUserId
};