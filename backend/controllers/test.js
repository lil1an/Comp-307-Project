export const getTest = async (req, res) => {
  res.status(200).json({
    message: 'Test API is working!',
  })
}
