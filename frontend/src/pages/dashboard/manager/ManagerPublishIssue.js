import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    FormRow,
    FormRowSelect,
    Loading,
    PageBtnContainer,
} from "../../../components";

import {
    createIssue,
    getAcceptedPaper,
    getLatestIssue,
} from "../../../context/service/journalService";
import { default as ItemWrapper } from "../../../assets/wrappers/Item";
import { default as SearchWrapper } from "../../../assets/wrappers/SearchContainer";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { handleChange } from "../../../context/service/utilService";
import { manager } from "../../../context/state";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ManagerPublishIssue = () => {
    const {
        base: { isLoading },
        manager: {
            publishIssue: {
                result: papers,
                publishes,
                startDate,
                endDate,
                latestIssue,
                confirm,
                page,
                numOfPage,
            },
        },
    } = useSelector((state) => state);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLatestIssue());
        dispatch(getAcceptedPaper({ page: page }));
        console.log("Minh Chua")
    }, [dispatch, page]);

    // Select start date, end date
    // List all accepted paper
    // Search + Paging
    // Select accepted paper
    // Edit access level of chosen accepted paper
    // Publish new issue

    const dragItem = useRef(1)
    const dragOverItem = useRef()

    function handleDragStart(e) {

        console.log("Nguyenn Thi Minh Chau", e.target.key)
        return dragItem.current = e.target.key;
    }
    const handleSort = (e) => {
        e.target.style.opacity = '1';

        let _results = [...publishes]
        const draggedItemContent = _results.splice(dragItem.current, 1)[0]
        _results.splice(dragOverItem.current, 0, draggedItemContent)
        dragItem.current = null
        dragOverItem.current = null
        dispatch(
            handleChange({
                name: "publishes",
                value: _results,
                type: "manager_publishissue",
            })
        );
    }

    const handleSelect = (paper) => {
        var checkbox = document.getElementById(`paper-${paper.paperId}`);
        let newPublishes = publishes;
        if (checkbox.checked) {
            newPublishes.push({ paper, accessLevel: "OPEN" });
        } else {
            newPublishes = newPublishes.filter(
                (tmpPaper) => tmpPaper.paperId !== paper.paperId
            );
        }

        dispatch(
            handleChange({
                name: "publishes",
                value: newPublishes,
                type: "manager_publishissue",
            })
        );
    };

    const handleDateChange = (e) => {
        dispatch(
            handleChange({
                name: e.target.name,
                value: e.target.value,
                type: "manager_publishissue",
            })
        );
    };

    const handleButtonChange = (e) => {
        e.preventDefault();
        // TODO: if confirm is false, then validate start date and end date
        dispatch(
            handleChange({
                name: "confirm",
                value: !confirm,
                type: "manager_publishissue",
            })
        );
    };

    const handlePageChange = (page) => {
        dispatch(
            handleChange({ name: "page", value: page, type: "manager_publishissue" })
        );
    };

    const checkObject = (paperId) => {
        for (let i = 0; i < publishes.length; i++) {
            if (publishes[i].paper.paperId === paperId) {
                return true;
            }
        }
        return false;
    };

    const handleConfirm = (e) => {
        e.preventDefault();
        dispatch(createIssue({ startDate, endDate, publishes }));
    };

    let nextIssue = 1;
    let nextVolume = 1;
    if (latestIssue != null) {
        const currentYear = new Date().getFullYear();
        if (latestIssue.year !== currentYear) {
            nextVolume = latestIssue.volume + 1;
        } else {
            nextIssue = latestIssue.issue + 1;
            nextVolume = latestIssue.volume;
        }
    }

    if (confirm) {
        const handleAccessLevelChange = (paperId, value) => {
            let newPublishes = publishes;

            for (let i = 0; i < newPublishes.length; i++) {
                if (newPublishes[i].paper.paperId === paperId) {
                    newPublishes[i].accessLevel = value;
                }
            }

            dispatch(
                handleChange({
                    name: "publishes",
                    value: newPublishes,
                    type: "manager_publishissue",
                })
            );
        };

        return (
            <>

                <button
                    className="btn"
                    disabled={isLoading}
                    onClick={handleButtonChange}
                >
                    Back
                </button>

                <ItemWrapper>
                    <header>
                        <div className="info">
                            <h5>
                                Publish for next issue: Volume {nextVolume} Issue {nextIssue}
                            </h5>
                        </div>
                    </header>
                </ItemWrapper>

                <ContainerWrapper>
                    <h3>Selected papers</h3>

                    <div className="container">
                        {publishes.map((tmpPub, index) => {
                            return (
                                <ItemWrapper>
                                    <header>

                                        <div className="container-SelectedPaper"
                                            Draggable="true"
                                            id={index}
                                            onDragStart={(e) => {
                                                e.target.style.opacity = '0.4';
                                                (dragItem.current = index)
                                            }}
                                            // onDragStart={handleDragStart}
                                            onDragEnter={(e) => {
                                                if (e.target.className == "droptarget") {
                                                    e.target.style.border = "3px dotted red";
                                                }
                                                (dragOverItem.current = index)
                                            }}
                                            onDragEnd={handleSort}
                                            onDragOver={(e) => {

                                                e.preventDefault()
                                            }}
                                            onDrop={(e) => {
                                                if (e.target.className == "droptarget") {
                                                    e.target.style.border = "";
                                                }

                                            }}
                                            onDragLeave={(e) => {
                                                if (e.target.className == "droptarget") {
                                                    e.target.style.border = "";
                                                }
                                            }}
                                        >

                                            <div>{index + 1}</div>
                                            <div className="info">
                                                <h5 >{tmpPub.paper.title}</h5>
                                            </div>
                                            <FormRowSelect
                                                labelText="Access level"
                                                name="accessLevel"
                                                value={tmpPub.accessLevel}
                                                handleChange={(e) =>
                                                    handleAccessLevelChange(
                                                        tmpPub.paper.paperId,
                                                        e.target.value
                                                    )
                                                }
                                                list={["OPEN", "PRIVATE"]}
                                            />
                                            <div className="droptarget"></div>

                                        </div>
                                    </header>

                                </ItemWrapper>

                            );
                        })}
                    </div>

                </ContainerWrapper>
                <button className="btn" disabled={isLoading} onClick={handleConfirm}>
                    Confirm Publish
                </button>
            </>
        );
    }

    return (
        <>
            <ItemWrapper>
                <header>
                    <div className="info">
                        <h5>
                            Publish for next issue: Volume {nextVolume} Issue {nextIssue}
                        </h5>
                    </div>
                </header>
            </ItemWrapper>

            <SearchWrapper>
                <form className="form">
                    <div className="form-center">
                        <FormRow
                            labelText="Start date"
                            type="date"
                            name="startDate"
                            value={startDate}
                            handleChange={handleDateChange}
                        />
                        <FormRow
                            labelText="End date"
                            type="date"
                            name="endDate"
                            value={endDate}
                            handleChange={handleDateChange}
                        />
                        <button
                            className="btn"
                            disabled={isLoading}
                            onClick={handleButtonChange}
                        >
                            Next
                        </button>
                    </div>
                </form>
            </SearchWrapper>
            {/* TODO: search bar*/}

            {papers.length > 0 && (
                <PageBtnContainer
                    page={page}
                    numOfPage={numOfPage}
                    changePage={handlePageChange}
                />
            )}

            {isLoading ? (
                <Loading center />
            ) : papers.length > 0 ? (
                <ContainerWrapper>
                    <div className="container">
                        <h3>Accepted Paper - {publishes.length} papers selected</h3>
                        {papers.map((paper, index) => {
                            return (
                                <ItemWrapper
                                    key={index}>
                                    <div className="content"
                                        Draggable="true"
                                    >
                                        <input
                                            type="checkbox"
                                            id={`paper-${paper.paperId}`}
                                            value={paper.paperId}
                                            checked={checkObject(paper.paperId)}
                                            onChange={() => handleSelect(paper)}
                                        />
                                        <h5 Draggable> {paper.title}</h5>
                                    </div>
                                </ItemWrapper>
                            );
                        })}
                    </div>
                </ContainerWrapper>
            ) : (
                <p>No accepted paper yet</p>
            )}
        </>
    );
};

export default ManagerPublishIssue;
