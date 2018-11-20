import React from 'react';

export default function Pagination({ noOfPostsPerPage, noOfActualPosts, selectedPage ,onPageChange }) {
    let noOfPages = Math.ceil(noOfActualPosts / noOfPostsPerPage);
    let pages = Array.from(new Array(noOfPages + 2), (_, index) => {
        if(index === 0){
            return(
                <li key={index} className="page-item" onClick={() => onPageChange(index) }>
                    <a className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </a>
                </li>
            )
        }
        if(index === noOfPages + 1){
            return(
                <li key={index} className="page-item" onClick={() => onPageChange(index) }>
                    <a className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </a>
                </li>
            )
        }else{
            let isActive = index === selectedPage ? 'active' : '';
            let classes = `page-item ${isActive}`
            return (
                <li key={index} className={classes} onClick={ () => onPageChange(index) }>
                    <a className="page-link">{ index }</a>
                </li>
            )
        }
    })

    return(
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
            {
                pages
            }
            </ul>
        </nav>
    )
}
