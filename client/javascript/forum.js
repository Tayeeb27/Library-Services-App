const openTab = (tabName) => {
    const tabs = document.querySelectorAll(".tab-content");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
    }
    document.getElementById(tabName + '-content').style.display = "block";
}