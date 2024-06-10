<template>
  <el-container>
    <el-main>
      <el-card v-if="article" class="article-detail">
        <h1>{{ article.title }}</h1>
        <p>{{ article.content }}</p>
      </el-card>
      <div v-else class="no-data">文章不存在</div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from '../axios';
import type { Article } from "../types/Article";

const article = ref<Article | null>(null);
const route = useRoute();

const fetchArticle = async () => {
  const { id } = route.params;
  try {
    const response = await axios.get<Article>(`/articles/${id}`);
    article.value = response.data;
  } catch (error) {
    console.error('Failed to load article:', error);
  }
};

onMounted(fetchArticle);
</script>

<style scoped>
.article-detail {
  margin: 20px 0;
}

.no-data {
  text-align: center;
  font-size: 1.2em;
  color: #999;
}
</style>

  