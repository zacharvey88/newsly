export default () => {

  return (
    <section className="mb-5">
      <div className="card bg-light">
          <div className="card-body">
              {/* <!-- Comment form--> */}
              <form className="mb-4"><textarea className="form-control" rows="3" placeholder="Join the discussion and leave a comment!"></textarea></form>
              {/* <!-- Single comment--> */}
              <div className="d-flex">
                  <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                  <div className="ms-3">
                      <div className="fw-bold">Commenter Name</div>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo quia quidem, odit cumque quibusdam officia natus ad, reprehenderit explicabo at, et unde atque. Quam, tempore sed consequuntur temporibus explicabo rerum.
                  </div>
              </div>
          </div>
      </div>
    </section>
  )
}