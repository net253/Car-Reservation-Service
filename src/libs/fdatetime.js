const fdatetime = (data) => {
  if (data) {
    const datetime = new Date(data);
    const year = datetime.getFullYear();
    let month = datetime.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    const date =
      datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();

    const hours =
      datetime.getHours() < 10
        ? "0" + datetime.getHours()
        : datetime.getHours();
    const minutes =
      datetime.getMinutes() < 10
        ? "0" + datetime.getMinutes()
        : datetime.getMinutes();
    const seconds =
      datetime.getSeconds() < 10
        ? "0" + datetime.getSeconds()
        : datetime.getSeconds();

    const getFDate = `${year}-${month}-${date}`;
    const getFDatetime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    const getFDatetimeHours = `${year}-${month}-${date} ${hours}:00:00`;

    return { getFDate, getFDatetime, getFDatetimeHours };
  }
  return { getFDate: null, getFDatetime: null, getFDatetimeHours: null };
};

export default fdatetime;
