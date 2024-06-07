import React, { useState, useEffect } from 'react';
import './RandomQuote.css';
import twitter_icon from '../Assets/twitter-x.png';
import reload_icon from '../Assets/reload.png';
import fav_icon from '../Assets/fav.png';
import favorite_icon from '../Assets/favorite.png';
import remove_icon from '../Assets/trash.png';

const RandomQuote = () => {
    // State variables
    const [quotes, setQuotes] = useState([]); // List of quotes
    const [quote, setQuote] = useState({ // Currently displayed quote
        text: "You don’t have to be great to start, but you have to start to be great.",
        author: "Zig Ziglar"
    });
    const [favoriteQuotes, setFavoriteQuotes] = useState([]); // List of favorite quotes
    const [showFavorites, setShowFavorites] = useState(false); // Flag to show/hide favorite quotes section
    const [isFavorite, setIsFavorite] = useState(false); // Flag indicating if the current quote is a favorite

    // Fetch quotes from API
    useEffect(() => {
        async function loadQuotes() {
            const response = await fetch("https://piwpiu.github.io/quotes-api/quotes.json");
            const quotesData = await response.json();
            setQuotes(quotesData);
        }
        loadQuotes();
    }, []);

    // Update isFavorite flag when quote or favoriteQuotes change
    useEffect(() => {
        setIsFavorite(favoriteQuotes.some(q => q.text === quote.text));
    }, [quote, favoriteQuotes]);

    // Generate a random quote
    const random = () => {
        const select = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(select);
        console.log("Generate new quote");
    }

    // Share quote on Twitter
    const twitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${quote.text} ~ ${quote.author.split(',')[0]}`);
        console.log("Twitter upload");
    }

    // Add quote to favorites
    const addFavorite = () => {
        if (quote && !favoriteQuotes.some(q => q.text === quote.text)) {
            setFavoriteQuotes([quote, ...favoriteQuotes]); // Add new quote to favorites
            console.log("Quote added to favorites");
            setShowFavorites(true); // Show favorite quotes section
            setIsFavorite(true); // Mark current quote as favorite
        } 
    };

    // Remove quote from favorites
    const removeFavorite = (indexToRemove) => {
        const newFavorites = favoriteQuotes.filter((_, index) => index !== indexToRemove);
        setFavoriteQuotes(newFavorites);
        console.log("Quote removed from favorites");
    };

    // Remove all quotes from favorites
    const removeAllFavorites = () => {
        setFavoriteQuotes([]);
        setShowFavorites(false);
        console.log("All quotes removed from favorites");
    };

    // Toggle favorite status of the current quote
    const toggleFavorite = () => {
        if (isFavorite) {
            const indexToRemove = favoriteQuotes.findIndex(q => q.text === quote.text);
            if (indexToRemove !== -1) {
                removeFavorite(indexToRemove);
                setIsFavorite(false);
            }
        } else {
            addFavorite();
            setIsFavorite(true);
        }
    };

    return (
        <div className='container'>
            <div className="quote">{quote.text}</div>
            <div>
                <div className="line"></div>
                <div className="bottom">
                    <div className="author">~ {quote.author.split(',')[0]}</div>
                    <div className="icons">
                        <div className="icon-wrapper">
                            <img className="logo" src={reload_icon} onClick={random} alt="Generate Quote" />
                            <span className="tooltip">Generate Quote</span>
                        </div>
                        <div className="icon-wrapper">
                            <img className="logo" src={twitter_icon} onClick={twitter} alt="Share on Twitter" />
                            <span className="tooltip">Share on Twitter</span>
                        </div>
                        <div className="icon-wrapper" onClick={toggleFavorite}>
                            <img className="logo" src={isFavorite ? favorite_icon : fav_icon} alt="Favorite" />
                            <span className="tooltip">{isFavorite ? "Remove from Favorites" : "Add Favorite"}</span>
                        </div>
                    </div>
                </div>
            </div>
            {showFavorites && (
                <div className="favorites">
                    <hr className='divider' />
                    <h2>Favorite Quotes</h2>
                    {favoriteQuotes.map((fav, index) => (
                        <div key={index} className="favorite">
                            <div>
                                <div className="fav-text">{fav.text}</div>
                                <div className="fav-author">~ {fav.author.split(',')[0]}</div>
                            </div>
                            <div className="remove-icon-wrapper" onClick={() => { removeFavorite(index); setIsFavorite(false); }}>
                                <img className="remove-icon" src={remove_icon} alt="Remove" />
                                <span className="tooltip">Remove</span>
                            </div>
                        </div>
                    ))}
                    <div className="icon-wrapper remove-all-icon-wrapper" onClick={removeAllFavorites}>
                        <img className="logo remove-all-icon" src={remove_icon} alt="Remove All Favorites" />
                        <span className="tooltip">Remove All Favorites</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RandomQuote;