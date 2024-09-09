package com.bemtevi.bem_te_vi_api.service;
import com.bemtevi.bem_te_vi_api.model.Comment;
import com.bemtevi.bem_te_vi_api.model.Post;
import com.bemtevi.bem_te_vi_api.model.User;
import com.bemtevi.bem_te_vi_api.repository.PostRepository;
import com.bemtevi.bem_te_vi_api.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public Post createPost(String userId, String description, String imageUrl) {
        User author = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Post post = new Post();
        post.setDescription(description);
        post.setImageUrl(imageUrl);
        post.setCreatedAt(LocalDateTime.now());
        post.setAuthor(author);

        return postRepository.save(post);
    }

    public void likePost(String postId, String userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        post.getLikes().add(user.getId());
        postRepository.save(post);
    }

    public void addComment(String postId, String userId, String content) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Comment comment = new Comment();
        comment.setAuthor(user);
        comment.setContent(content);
        comment.setCreatedAt(LocalDateTime.now());

        post.getComments().add(comment);
        postRepository.save(post);
    }

    public List<Post> getPostsByUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return postRepository.findByAuthor(user);
    }
}
