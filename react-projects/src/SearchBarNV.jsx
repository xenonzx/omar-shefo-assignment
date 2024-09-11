import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "./i18next/i18next--";
import Edit from "./assets/editing-white.png";
import SearchIcon from "./assets/loupe.png";
import Filter from "./assets/sorting.png";
import Plus from "./assets/add-file.png";
import highPrio from "./assets/Hpriority.png";
import midPrio from "./assets/Mpriority.png";
import lowPrio from "./assets/Lpriority.png";
import noprio from "./assets/Nopriority.png";
import Remove from "./assets/file.png";

const SearchBar = ({ data }) => {
  const { t, i18n } = useTranslation();
  const OS = "Omar Sherif El Dakhakhny";
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState(
    data.map((item) => ({
      text: item,
      priority: null,
      isCompleted: false,
      date: new Date(),
    }))
  );
  const [newItem, setNewItem] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isSortActive, setIsSortActive] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [sortMethod, setSortMethod] = useState("dateDesc"); // Changed default to "dateDesc"
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const priorityOptions = [
    { key: "high", image: highPrio },
    { key: "mid", image: midPrio },
    { key: "low", image: lowPrio },
    { key: "no", image: noprio },
  ];

  const sortOptions = [
    { value: "dateDesc", key: "newest" },
    { value: "dateAsc", key: "oldest" },
    { value: "az", key: "az" },
    { value: "hightolow", key: "highToLow" },
    { value: "lowtohigh", key: "lowToHigh" },
  ];

  useEffect(() => {
    console.log("Initial items state:", items);
  }, [data, items]);

  useEffect(() => {
    if (newItem.trim() !== "" && selectedPriority) {
      setError(null);
    }
  }, [newItem, selectedPriority]);

  const handleLanguageChange = (language) => {
    console.log("Language changed to:", language);
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    console.log("Search term changed:", value);
    setSearchTerm(value);
  };

  const handleNewItemChange = (event) => {
    const value = event.target.value;
    console.log("New item text changed:", value);
    setNewItem(value);
  };

  const handleAddItem = () => {
    console.log(
      "Attempting to add new item:",
      newItem,
      "with priority:",
      selectedPriority
    );
    if (newItem.trim() !== "" && selectedPriority) {
      setItems((prevItems) => {
        const updatedItems = [
          ...prevItems,
          {
            text: newItem,
            priority: selectedPriority,
            isCompleted: false,
            date: new Date(),
          },
        ];
        console.log("New item added. Updated items:", updatedItems);
        return updatedItems;
      });
      setNewItem("");
      setSelectedPriority(null);
      setError(null);
    } else {
      console.log("Error: Invalid input for new item");
      setError(t("pleaseEnter"));
    }
  };

  const handleDeleteItem = (itemToDelete) => {
    console.log("Deleting item:", itemToDelete);
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item !== itemToDelete);
      console.log("Item deleted. Updated items:", updatedItems);
      return updatedItems;
    });
  };

  const handleEditItem = (item) => {
    console.log("Editing item:", item);
    const index = items.findIndex((i) => i === item);
    setEditIndex(index);
    setEditText(item.text);
  };

  const handleSaveEdit = (item) => {
    console.log("Saving edit for item:", item, "New text:", editText);
    setItems((prevItems) => {
      const updatedItems = prevItems.map((i) =>
        i === item ? { ...i, text: editText } : i
      );
      console.log("Edit saved. Updated items:", updatedItems);
      return updatedItems;
    });
    setEditIndex(null);
    setEditText("");
  };

  const handleEditChange = (event) => {
    const value = event.target.value;
    console.log("Edit text changed:", value);
    setEditText(value);
  };

  const handleCheckboxChange = (item) => {
    console.log("Checkbox changed for item:", item);
    setItems((prevItems) => {
      const updatedItems = prevItems.map((i) =>
        i === item ? { ...i, isCompleted: !i.isCompleted } : i
      );
      console.log("Updated items:", updatedItems);
      return updatedItems;
    });
  };

  const handleSortChange = (sortValue) => {
    console.log("Sort method changed to:", sortValue);
    setSortMethod(sortValue);
    setIsSortActive(false);
  };

  const getSortedItems = () => {
    let sortedItems = [...items];

    switch (sortMethod) {
      case "az":
        sortedItems.sort((a, b) => a.text.localeCompare(b.text));
        break;
      case "hightolow":
        sortedItems.sort((a, b) => {
          const priorityOrder = { high: 4, mid: 3, low: 2, no: 1 };
          const aPriority = a.priority
            ? priorityOrder[a.priority.key.toLowerCase()] || 0
            : 0;
          const bPriority = b.priority
            ? priorityOrder[b.priority.key.toLowerCase()] || 0
            : 0;
          return bPriority - aPriority;
        });
        break;
      case "lowtohigh":
        sortedItems.sort((a, b) => {
          const priorityOrder = { high: 4, mid: 3, low: 2, no: 1 };
          const aPriority = a.priority
            ? priorityOrder[a.priority.key.toLowerCase()] || 0
            : 0;
          const bPriority = b.priority
            ? priorityOrder[b.priority.key.toLowerCase()] || 0
            : 0;
          return aPriority - bPriority;
        });
        break;
      case "dateDesc":
      default: // Added default case to handle initial sort and any unexpected values
        sortedItems.sort((a, b) => b.date.getTime() - a.date.getTime());
        break;
      case "dateAsc":
        sortedItems.sort((a, b) => a.date.getTime() - b.date.getTime());
        break;
    }

    return sortedItems;
  };

  const filteredItems = getSortedItems().filter((item) =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingItems = filteredItems.filter((item) => !item.isCompleted);
  const completedItems = filteredItems.filter((item) => item.isCompleted);

  const handleTabChange = (newTab) => {
    const previousTab = activeTab;
    console.log(`User switched from ${previousTab} to ${newTab}`);
    setActiveTab(newTab);
  };

  const renderItems = () => {
    switch (activeTab) {
      case "all":
        return renderSection(t("all"), filteredItems, "ALL");
      case "pending":
        return renderSection(t("pending"), pendingItems, "PENDING");
      case "completed":
        return renderSection(t("completed"), completedItems, "COMPLETED");
      default:
        return null;
    }
  };

  const renderItem = (item) => (
    <div className="area" key={item.text}>
      <input
        type="checkbox"
        className="check-"
        checked={item.isCompleted}
        onChange={() => handleCheckboxChange(item)}
      />
      {editIndex === items.findIndex((i) => i === item) ? (
        <input
          type="text"
          value={editText}
          onChange={handleEditChange}
          className="edit-input"
          id="Check"
        />
      ) : (
        <div>
          <p
            style={{
              textDecoration: item.isCompleted ? "line-through" : "none",
            }}
          >
            {item.text}
          </p>
        </div>
      )}
      {item.priority && (
        <img
          src={item.priority.image}
          alt={`${t(item.priority.key)} priority`}
          className="priority-icon"
        />
      )}
      <div className="buttons-con">
        {editIndex === items.findIndex((i) => i === item) ? (
          <button className="save-but" onClick={() => handleSaveEdit(item)}>
            {t("save")}
          </button>
        ) : (
          <img
            src={Edit}
            className="edit-img"
            onClick={() => handleEditItem(item)}
          />
        )}
        <img
          src={Remove}
          className="remove"
          onClick={() => handleDeleteItem(item)}
        />
      </div>
    </div>
  );

  const renderSection = (title, items, className) => (
    <>
      <h3 className={className}>{title}</h3>
      <div className={`${className.toLowerCase()}-con`}>
        <div className={className.toLowerCase()}>
          {items.length > 0 ? (
            items.map((item) => renderItem(item))
          ) : (
            <div className="nothing">
              <p className="no-items">{t("empty")}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="lang">
        <p
          id="english"
          className={`en ${selectedLanguage === "en" ? "selected-lang" : ""}`}
          onClick={() => handleLanguageChange("en")}
        >
          {t("English")}
        </p>
        <p
          id="arabic"
          className={`ar ${selectedLanguage === "ar" ? "selected-lang" : ""}`}
          onClick={() => handleLanguageChange("ar")}
        >
          {t("عربي")}
        </p>
      </div>
      <div className="con-con">
        <div className="container-con">
          <div className="container">
            <div className="project-div">
              <div className="title">
                <span className="notes">
                  {t("notes")}
                  <span className="by">{t("by")}</span>
                  <br />
                  <span className="os">
                    <span className="os-animation">{t("OS")}</span>
                  </span>
                </span>
              </div>
              <br />
              <div className="input-n-sort">
                <div className="input-con-con">
                  <div className="input-con">
                    <img src={SearchIcon} alt="Search Icon" />
                    <input
                      className="search"
                      type="text"
                      placeholder={t("searchPlaceholder")}
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
                <div className="sort-dropdown-container">
                  <img src={Filter} alt="Filter Icon" className="sort" />
                  <div className="sort-dropdown">
                    <div className="a-con">
                      {sortOptions.map((option) => (
                        <p
                          key={option.value}
                          className={option.value}
                          onClick={() => handleSortChange(option.value)}
                        >
                          {t(option.key)}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="APC">
                <p
                  className={`APC-text1 ${activeTab === "all" ? "active" : ""}`}
                  onClick={() => handleTabChange("all")}
                >
                  {t("all")}
                </p>
                <p
                  className={`APC-text2 ${
                    activeTab === "pending" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("pending")}
                >
                  {t("pending")}
                </p>
                <p
                  className={`APC-text3 ${
                    activeTab === "completed" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("completed")}
                >
                  {t("completed")}
                </p>
              </div>
              <br />
              {renderItems()}
              <div className="last-line">
                <div className="add">
                  <input
                    type="text"
                    id="toDoAdder"
                    value={newItem}
                    placeholder={t("todoadder")}
                    onChange={handleNewItemChange}
                  />
                  <div className="last-l-right">
                    <div className="dropdown">
                      <div
                        className={`dropdown-but ${isActive ? "active" : ""}`}
                        onClick={() => {
                          console.log("Priority dropdown toggled");
                          setIsActive(!isActive);
                        }}
                      >
                        <p className="sp">{t("selectPriority")}</p>
                        <span className="arrow"></span>
                      </div>
                      {isActive && (
                        <div className="dropdown-cont">
                          {priorityOptions.map((option) => (
                            <div
                              key={option.key}
                              onClick={() => {
                                console.log("Priority selected:", option.key);
                                setSelectedPriority(option);
                                setIsActive(false);
                              }}
                              className="dropdown-item"
                            >
                              <p>
                                {option.image && (
                                  <img
                                    src={option.image}
                                    alt={`${t(option.key)} priority`}
                                    className="prio"
                                  />
                                )}
                                <span className="opt-key">{t(option.key)}</span>
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="plus-i-con">
                      <img
                        src={Plus}
                        alt={t("add")}
                        className="todo-plus"
                        onClick={handleAddItem}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </>
  );
};

export default SearchBar;
