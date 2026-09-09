const $ = (id) => document.getElementById(id);

const tabs = document.querySelectorAll(".tab");
const pages = document.querySelectorAll(".page");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    pages.forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    $(tab.dataset.page).classList.add("active");
  });
});

// LOCATION — Data Matrix
$("letter").addEventListener("input", () => {
  $("letter").value = $("letter").value.replace(/[^a-z]/gi, "").slice(0, 1).toUpperCase();
});

$("locationForm").addEventListener("submit", (event) => {
  event.preventDefault();
  $("locationError").hidden = true;

  if (!$("number1").value || !$("letter").value || !$("number2").value) {
    $("locationError").textContent = "Please fill in all four fields.";
    $("locationError").hidden = false;
    $("locationResult").hidden = true;
    return;
  }

  const value = $("prefix").value + $("number1").value + $("letter").value + $("number2").value;

  try {
    bwipjs.toCanvas($("locationCanvas"), {
      bcid: "datamatrix",
      text: value,
      scale: 8,
      padding: 0
    });
    $("locationValue").textContent = value;
    $("locationResult").hidden = false;
  } catch (err) {
    $("locationError").textContent = "Could not generate Data Matrix.";
    $("locationError").hidden = false;
    $("locationResult").hidden = true;
  }
});

// ITEM — Code 128
$("itemCode").addEventListener("input", () => {
  $("itemCode").value = $("itemCode").value.toUpperCase();
});

$("itemForm").addEventListener("submit", (event) => {
  event.preventDefault();
  $("itemError").hidden = true;

  const value = $("itemCode").value.trim().toUpperCase();

  if (!value) {
    $("itemError").textContent = "Please enter a code.";
    $("itemError").hidden = false;
    $("itemResult").hidden = true;
    return;
  }

  try {
    bwipjs.toCanvas($("itemCanvas"), {
      bcid: "code128",
      text: value,
      scale: 3,
      height: 12,
      includetext: true,
      textxalign: "center",
      padding: 0
    });
    $("itemValue").textContent = value;
    $("itemResult").hidden = false;
  } catch (err) {
    $("itemError").textContent = "Could not generate Code 128.";
    $("itemError").hidden = false;
    $("itemResult").hidden = true;
  }
});

// DZ — placeholder for future Matrix codes
document.querySelectorAll(".dz-option").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".dz-option").forEach(b => b.classList.remove("active"));
    button.classList.add("active");

    const type = button.dataset.dz;
    $("dzError").hidden = true;
    $("dzValue").textContent = `DZ-${type}`;

    // The actual B/C Matrix codes will be added here once their exact
    // encoded values are known.
    $("dzError").textContent = `Matrix code for ${type} will be added later.`;
    $("dzError").hidden = false;
    $("dzResult").hidden = true;
  });
});
