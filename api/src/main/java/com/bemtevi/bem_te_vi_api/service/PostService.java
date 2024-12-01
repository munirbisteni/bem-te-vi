package com.bemtevi.bem_te_vi_api.service;
import com.bemtevi.bem_te_vi_api.dto.PostDTO;
import com.bemtevi.bem_te_vi_api.model.Comment;
import com.bemtevi.bem_te_vi_api.model.Post;
import com.bemtevi.bem_te_vi_api.model.User;
import com.bemtevi.bem_te_vi_api.repository.PostRepository;
import com.bemtevi.bem_te_vi_api.repository.UserRepository;
import com.bemtevi.bem_te_vi_api.utils.PostMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class PostService{

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public Post createPost(String userId, String description, byte[] image) {
        User author = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Post post = new Post();
        post.setDescription(description);
        post.setImage(image);
        post.setCreatedAt(LocalDateTime.now());
        post.setAuthor(author);

        return postRepository.save(post);
    }

    public void likePost(String postId, String userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));
        userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (post.getLikes().contains(userId)) {
            unlikePost(postId, userId);
            return;
        }

        post.getLikes().add(userId);
        postRepository.save(post);
    }

    public void unlikePost(String postId, String userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));
        userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        post.getLikes().remove(userId);

        postRepository.save(post);
    }

    public List<PostDTO> getPosts(String userId) {
        List<Post> posts = postRepository.findAll()
                .stream()
                .filter(post -> !post.getAuthor().getId().equals(userId))
                .toList();

        return posts.stream()
                .map(PostMapper::toPostDTO)
                .collect(Collectors.toList());
    }

    public List<PostDTO> getPostsByUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Post> posts = postRepository.findByAuthor(user);
        return posts.stream()
                .map(PostMapper::toPostDTO)
                .collect(Collectors.toList());
    }

    public List<PostDTO> getPostsByUserIds(List<String> userIds) {
        List<Post> posts = postRepository.findByAuthorIn(userIds);
        return posts.stream()
                .map(PostMapper::toPostDTO)
                .collect(Collectors.toList());
    }

    public Post findById(String postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new UsernameNotFoundException("post id not found"));
    }

    public void uploadPostImage(String postId, byte[] imageBytes) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new UsernameNotFoundException("post id not found"));
        post.setImage(imageBytes);
        postRepository.save(post);
    }
}
