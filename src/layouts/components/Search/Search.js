import {
    faCircleXmark,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import * as SearchService from '~/services/searchService';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const searchInputRef = useRef();

    const debounceValue = useDebounce(searchValue, 500);
    useEffect(() => {
        if (debounceValue.trim() === '') {
            setSearchResult([]);
            return;
        }

        setLoading(true);

        const fetchAPi = async () => {
            setLoading(true);
            const result = await SearchService.search(debounceValue);
            setSearchResult(result);
        };

        fetchAPi();

        setLoading(false);

    }, [debounceValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        searchInputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (value) => {

        if (value.startsWith(' ')) {
            return;
        }
        setSearchValue(value);
    };


    return (
        //
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                onClickOutside={handleHideResult}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {
                                searchResult.map(account => (
                                    <AccountItem key={account.id} account={account} />
                                ))
                            }
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input
                        ref={searchInputRef}
                        value={searchValue}
                        onChange={e => handleChange(e.target.value)}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onFocus={() => setShowResult(true)}
                    />
                    {
                        searchValue.length > 0 && !loading && (
                            <button onClick={handleClear} className={cx('clear')}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        )
                    }
                    {
                        loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                    }

                    <button className={cx('search-btn')} onMouseDown={e => e.preventDefault()}>
                        <SearchIcon width="1.9rem" height="1.9rem" />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
};

export default Search;