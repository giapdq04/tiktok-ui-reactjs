import React from 'react';
import classNames from 'classnames/bind';
import style from './SuggestAccounts.module.scss';
import PropTypes from 'prop-types';
import AccountItem from '~/components/SuggestAccounts/AccountItem';

const cx = classNames.bind(style);

function SuggestAccounts({ label }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>
                {label}
            </p>

            <AccountItem />
            <AccountItem />
            <AccountItem />
            <AccountItem />
            <AccountItem />

            <p className={cx('more-btn')}>See All</p>
        </div>
    );
}

SuggestAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestAccounts;