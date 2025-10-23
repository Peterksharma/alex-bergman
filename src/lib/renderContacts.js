export const renderContacts = (data) => {
  const hrefPhone = data.phone.number.replace(/\D/g, '')

  return (
    <div className="">
    <div>
      <a className="flex gap-2" href={`tel:${hrefPhone}`}>
        <span className="flex-shrink-0">{data.phone.icon}</span>
        {data.phone.number}
      </a>
      <a className="flex gap-2" href={`mailto:${data.email.address}`}>
        <span className="flex-shrink-0">{data.email.icon}</span>
        {data.email.address}
      </a>
      <div className="flex gap-2">
        <span className="flex-shrink-0">{data.address.icon}</span>
        <div>
          {data.address.line1}
          <br />
          {data.address.line2}
        </div>
      </div>
    </div>
    </div>
  );
};
