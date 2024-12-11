import notificationService from '../services/notificationService.js';

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
    console.error('Error getting notification by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const notificationController = {
  getNotificationById,
  createNewNotification,
};

export default notificationController;