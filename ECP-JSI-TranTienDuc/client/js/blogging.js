import {
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  doc,
  addDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth, db } from "./firebase-config.js";

const bloggingCard = document.querySelector(".blogging-card");
function toSlug(str) {
  return str
    .normalize("NFD") // Tách dấu
    .replace(/[\u0300-\u036f]/g, "") // Xoá dấu
    .toLowerCase()
    .replace(/\s+/g, "-") // Thay ký tự khoác bằng dấu '-'
    .replace(/[^\w\-]+/g, "") // Xoá ký tự lạ
    .replace(/\-\-+/g, "-") // Gộp dấu '-' liên tiếp
    .replace(/^-+/, "") // Xoá '-' ở đầu
    .replace(/-+$/, ""); // Xoá '-' ở cuối
}

window.approvePost = async function (postId) {
  const docRef = doc(db, "posts", postId);
  await updateDoc(docRef, { approved: true });
  alert("Đã duyệt bài viết!");
  loadPendingPosts();
};

async function loadPendingPosts() {
  const q = query(collection(db, "posts"), where("approved", "==", false));
  const querySnapshot = await getDocs(q);
  const container = document.getElementById("pending-posts");
  container.innerHTML = "";

  if (querySnapshot.empty) {
    container.innerHTML = "<p>Không có bài viết nào đang chờ duyệt.</p>";
    return;
  }

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.content.substring(0, 100)}...</p>
        <button onclick="approvePost('${docSnap.id}')">✅ Duyệt</button>
        <hr>
      `;
    container.appendChild(div);
  });
}

async function saveBlog() {
  onAuthStateChanged(auth, async (user) => {
    bloggingCard.innerHTML = "";

    if (!user) {
      bloggingCard.innerHTML = `<p>Vui lòng đăng nhập để viết bài.</p>`;
      return;
    }

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const role = userDoc.exists() ? userDoc.data().role : "user";

    if (role === "user") {
      bloggingCard.innerHTML = `
          <div class="banner">
            <i class="fa-solid fa-certificate" style="color: --primary-color;"></i>
            <h1>Blogging</h1>
            <i class="fa-solid fa-certificate" style="color: --primary-color;"></i>
          </div>
          <input type="text" id="title" placeholder="Title"><br>
          <textarea id="content" placeholder="Content"></textarea><br>
          <button type="submit" id="submit">Submit</button>
        `;

      const submitBlogBtn = document.getElementById("submit");
      submitBlogBtn.addEventListener("click", async () => {
        const inputTitle = document.getElementById("title").value;
        const inputContent = document.getElementById("content").value;
        const inputSlug = toSlug(inputTitle);
        const user = auth.currentUser;

        if (!user) {
          alert("You need to login first!");
          window.location.href = "login.html";
          return;
        }

        const authorName = user.displayName || user.email;

        const docRef = await addDoc(collection(db, "posts"), {
          title: inputTitle,
          content: inputContent,
          slug: inputSlug,
          createdAt: new Date(),
          author: authorName,
          approved: false,
        });

        alert("Successfully posted!");
        window.location.href = `post.html?id=${docRef.id}`;
      });
    } else if (role === "admin") {
      bloggingCard.innerHTML = `
          <div class="banner">
            <i class="fa-solid fa-certificate" style="color: --primary-color;"></i>
            <h1>Admin - Duyệt bài viết</h1>
            <i class="fa-solid fa-certificate" style="color: --primary-color;"></i>
          </div>
          <div id="pending-posts">Đang tải bài viết...</div>
        `;
      loadPendingPosts();
    }
  });
}

document.addEventListener("DOMContentLoaded", saveBlog);
