import React from 'react';
import classes from './SingleQuestion.module.css';

const SingleQuestion = () => {
    return (
        <div
            style={{
                width: '100%',
                border: '2px solid #797979',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '20px',
                alignItems: 'center',
                marginBottom: '18px',
                boxSizing: 'border-box',
            }}
        >
            <div className={classes.Left}>
                <div className={classes.Arrows}>
                    {/* TODO:CUSTOM ICONS */}
                    <i class="fas fa-angle-up"></i>
                    <i class="fas fa-angle-down"></i>
                </div>
                <div className={classes.Text}>
                    <div
                        style={{
                            fontWeight: 'bold',
                            fontSize: '12px',
                            lineHeight: '14px',
                            letterSpacing: '0.04em',
                        }}
                    >
                        Question 1 - Text
                    </div>
                    <div
                        style={{
                            fontSize: '20px',
                            lineHeight: '23px',
                            marginTop: '4px',
                        }}
                    >
                        Do you have any pets?
                    </div>
                </div>
            </div>
            <div className={classes.Right}>
                <div className={classes.ButtonEdit}>Edit</div>
                <div className={classes.ButtonDelete}>Delete</div>
            </div>
        </div>
    );
};

export default SingleQuestion;
