module.exports = (status, data, error = null) => {
  let response = {
    status: status,
    data: data.map(item  => {
      return item.createResponse();
  })
  }
  if(error) {
    response.error = error
  }
  return response
}