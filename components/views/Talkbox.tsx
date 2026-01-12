import React, { useState, useRef, useEffect } from 'react';
import { Card, Button } from '../ui';
import { MOCK_POSTS, MOCK_USERS } from '../../constants';
import { 
  Image, 
  Paperclip, 
  Send, 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  Smile, 
  Edit2, 
  Trash2, 
  X, 
  Globe
} from 'lucide-react';
import { Comment, Post } from '../../types';

// --- Sub-components ---

const CommentItem: React.FC<{ comment: Comment; isReply?: boolean }> = ({ comment, isReply = false }) => (
  <div className={`flex gap-3 ${isReply ? 'mt-3 pl-4 md:pl-10 relative' : 'mt-4'}`}>
    {isReply && (
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-800 rounded-full" />
    )}
    
    <div className="shrink-0">
      <div className={`rounded-full overflow-hidden border border-zinc-700 ${isReply ? 'w-8 h-8' : 'w-10 h-10'}`}>
        <img src={comment.author.avatar} alt={comment.author.name} className="w-full h-full object-cover" />
      </div>
    </div>
    
    <div className="flex-1">
      <div className="bg-zinc-800/50 rounded-2xl px-4 py-2.5 inline-block min-w-[200px]">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-semibold text-zinc-200">{comment.author.name}</span>
          <span className="text-xs text-zinc-500">• {comment.timestamp}</span>
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed">{comment.content}</p>
      </div>
      
      <div className="flex items-center gap-4 mt-1 pl-2">
        <button className="text-xs font-medium text-zinc-500 hover:text-primary transition-colors">Like</button>
        <button className="text-xs font-medium text-zinc-500 hover:text-primary transition-colors">Reply</button>
        {comment.likes > 0 && (
           <div className="flex items-center gap-1 text-xs text-zinc-500">
              <div className="p-0.5 bg-primary rounded-full"><Heart size={8} fill="white" className="text-white" /></div>
              {comment.likes}
           </div>
        )}
      </div>

      {comment.replies && comment.replies.map(reply => (
        <CommentItem key={reply.id} comment={reply} isReply={true} />
      ))}
    </div>
  </div>
);

const PostCard: React.FC<{ 
  post: Post; 
  currentUser: any;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}> = ({ post, currentUser, onUpdate, onDelete }) => {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const isAuthor = post.author.id === currentUser.id;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSave = () => {
    if (!editContent.trim()) return;
    onUpdate(post.id, editContent);
    setIsEditing(false);
    setShowMenu(false);
  };

  return (
    <Card className="p-0 overflow-visible bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-md">
      {/* Post Header */}
      <div className="p-5 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-800 ring-2 ring-zinc-800/50">
            <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-bold text-white text-base hover:underline cursor-pointer">{post.author.name}</div>
            <div className="text-xs text-zinc-500 flex items-center gap-1">
              {post.author.department}
              <span className="w-1 h-1 rounded-full bg-zinc-600" />
              {post.timestamp}
              <Globe size={10} className="ml-1" />
            </div>
          </div>
        </div>
        
        {/* Context Menu */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="text-zinc-500 hover:text-zinc-200 transition-colors p-2 hover:bg-zinc-800 rounded-lg"
          >
            <MoreHorizontal size={20} />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-10 w-40 bg-zinc-950 border border-zinc-800 rounded-lg shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {isAuthor ? (
                <>
                  <button 
                    onClick={() => { setIsEditing(true); setShowMenu(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center gap-2 transition-colors"
                  >
                    <Edit2 size={14} /> Edit Post
                  </button>
                  <button 
                    onClick={() => { onDelete(post.id); setShowMenu(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </>
              ) : (
                <button className="w-full text-left px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center gap-2 transition-colors">
                  <Share2 size={14} /> Copy Link
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="px-5 pb-2">
        {isEditing ? (
          <div className="mb-4 space-y-3 bg-zinc-900/50 p-3 rounded-xl border border-zinc-800">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full bg-transparent border-none text-zinc-200 text-sm focus:outline-none focus:ring-0 min-h-[100px] resize-none"
              placeholder="Edit your post..."
              autoFocus
            />
            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800/50">
              <Button variant="ghost" onClick={() => { setIsEditing(false); setEditContent(post.content); }} className="h-8 text-xs">
                Cancel
              </Button>
              <Button onClick={handleSave} className="h-8 text-xs">
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-zinc-200 text-sm leading-7 mb-4 whitespace-pre-line">
            {post.content}
          </p>
        )}

        {post.images && (
          <div className={`grid gap-2 mb-4 ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {post.images.map((img, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden border border-zinc-800 aspect-video group relative">
                <img src={img} alt="Post attachment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        )}

        {post.tags && (
          <div className="flex gap-2 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs font-medium text-primary hover:text-primaryDark cursor-pointer bg-primary/5 hover:bg-primary/10 px-2.5 py-1 rounded-md transition-colors">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stats Bar */}
      <div className="px-5 py-3 flex items-center justify-between text-xs text-zinc-500 border-b border-zinc-800/50">
        <div className="flex items-center gap-1">
           <div className="flex -space-x-1">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center border border-zinc-900">
                <Heart size={10} fill="white" className="text-white" />
              </div>
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center border border-zinc-900">
                <div className="text-[10px] text-white font-bold">👍</div>
              </div>
           </div>
           <span className="ml-1 hover:underline cursor-pointer">{post.likes + (liked ? 1 : 0)} likes</span>
        </div>
        <div className="flex gap-3">
          <span className="hover:underline cursor-pointer" onClick={() => setShowComments(!showComments)}>
            {post.commentsCount} comments
          </span>
          <span className="hover:underline cursor-pointer">2 shares</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-2 py-1 flex items-center justify-between">
        <button 
          onClick={() => setLiked(!liked)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all
            ${liked ? 'text-pink-500' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'}
          `}
        >
          <Heart size={18} className={liked ? 'fill-current' : ''} /> Like
        </button>
        <button 
          onClick={() => setShowComments(true)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 transition-all"
        >
          <MessageCircle size={18} /> Comment
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 transition-all">
          <Share2 size={18} /> Share
        </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="bg-zinc-950/30 border-t border-zinc-800/50 p-5 animate-in slide-in-from-top-2 duration-200">
          <div className="flex gap-3 mb-6">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-zinc-700 shrink-0">
               <img src={currentUser.avatar} alt="Me" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 relative">
               <input 
                 type="text" 
                 placeholder="Write a comment..." 
                 className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-2xl pl-4 pr-12 py-2.5 text-sm text-zinc-200 focus:outline-none focus:bg-zinc-800 focus:border-primary/50 transition-all"
               />
               <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                 <button className="p-1.5 text-zinc-400 hover:text-zinc-200 rounded-full hover:bg-zinc-700 transition-colors">
                   <Smile size={16} />
                 </button>
                 <button className="p-1.5 text-primary hover:text-primaryDark rounded-full hover:bg-primary/10 transition-colors">
                   <Send size={16} />
                 </button>
               </div>
            </div>
          </div>

          <div className="space-y-1">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            ) : (
               <div className="text-center py-4 text-zinc-500 text-sm italic">
                  No comments yet. Be the first to start the conversation!
               </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

// --- Main Talkbox Component ---

export const Talkbox = () => {
  const currentUser = MOCK_USERS[0]; // Logged in as "Bach TV"
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  
  // Create Post State
  const [isCreating, setIsCreating] = useState(false);
  const [newContent, setNewContent] = useState('');

  const handleCreatePost = () => {
    if (!newContent.trim()) return;

    const newPost: Post = {
      id: `new-${Date.now()}`,
      author: currentUser,
      content: newContent,
      timestamp: 'Just now',
      likes: 0,
      commentsCount: 0,
      tags: [],
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewContent('');
    setIsCreating(false);
  };

  const handleUpdatePost = (id: string, content: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, content } : p));
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
      {/* Left Sidebar (Shortcuts) */}
      <div className="hidden lg:block lg:col-span-3 space-y-4">
         <div className="sticky top-24">
            <h3 className="px-3 text-xs font-semibold text-zinc-500 uppercase mb-2">Shortcuts</h3>
            <div className="space-y-1">
               {['All Departments', 'Engineering', 'Product Design', 'Announcements'].map((item, i) => (
                  <button key={i} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors ${i===0 ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}>
                     # {item}
                  </button>
               ))}
            </div>
         </div>
      </div>

      {/* Main Feed */}
      <div className="lg:col-span-6 space-y-6">
        
        {/* Create Post Widget */}
        <Card className="p-4 bg-zinc-900 border-zinc-800 relative">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-700 shrink-0">
               <img src={currentUser.avatar} alt="Me" className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1">
              {!isCreating ? (
                <button 
                  onClick={() => setIsCreating(true)}
                  className="w-full bg-zinc-800/50 hover:bg-zinc-800 text-left px-4 py-2.5 rounded-full text-zinc-400 text-sm transition-colors border border-transparent hover:border-zinc-700 h-10"
                >
                  What's on your mind, {currentUser.name.split(' ')[0]}?
                </button>
              ) : (
                <div className="animate-in fade-in zoom-in-95 duration-200">
                  <textarea 
                    autoFocus
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder={`What's on your mind, ${currentUser.name.split(' ')[0]}?`}
                    className="w-full bg-transparent border-none text-zinc-200 text-base focus:outline-none focus:ring-0 min-h-[120px] resize-none p-0 mb-4 placeholder:text-zinc-500"
                  />
                  
                  <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
                     <div className="flex gap-1">
                        <Button variant="ghost" className="h-8 px-2 text-zinc-400 hover:text-green-400 hover:bg-green-400/10" title="Photo/Video">
                           <Image size={18} />
                        </Button>
                        <Button variant="ghost" className="h-8 px-2 text-zinc-400 hover:text-blue-400 hover:bg-blue-400/10" title="Attachment">
                           <Paperclip size={18} />
                        </Button>
                        <Button variant="ghost" className="h-8 px-2 text-zinc-400 hover:text-yellow-400 hover:bg-yellow-400/10" title="Feeling/Activity">
                           <Smile size={18} />
                        </Button>
                     </div>
                     <div className="flex gap-2">
                        <Button variant="ghost" onClick={() => setIsCreating(false)} className="h-8 text-xs">
                           Cancel
                        </Button>
                        <Button 
                          onClick={handleCreatePost}
                          className={`h-8 px-6 text-xs transition-all ${!newContent.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={!newContent.trim()}
                        >
                           Post
                        </Button>
                     </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {!isCreating && (
             <div className="flex items-center justify-between pt-3 mt-3 border-t border-zinc-800/50">
                <Button variant="ghost" className="flex-1 h-8 px-3 text-xs gap-2 text-zinc-400 hover:text-green-400 hover:bg-green-400/10">
                   <Image size={16} /> Photo/Video
                </Button>
                <Button variant="ghost" className="flex-1 h-8 px-3 text-xs gap-2 text-zinc-400 hover:text-blue-400 hover:bg-blue-400/10">
                   <Paperclip size={16} /> Attachment
                </Button>
                <Button variant="ghost" className="flex-1 h-8 px-3 text-xs gap-2 text-zinc-400 hover:text-yellow-400 hover:bg-yellow-400/10">
                   <Smile size={16} /> Feeling
                </Button>
             </div>
          )}
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
           {posts.length > 0 ? (
             posts.map((post) => (
               <PostCard 
                 key={post.id} 
                 post={post} 
                 currentUser={currentUser}
                 onUpdate={handleUpdatePost}
                 onDelete={handleDeletePost}
               />
             ))
           ) : (
             <div className="text-center py-10">
               <p className="text-zinc-500">No posts yet. Be the first to share something!</p>
             </div>
           )}
        </div>
      </div>

      {/* Right Sidebar (Trending/Events) */}
      <div className="hidden lg:block lg:col-span-3 space-y-6">
         <div className="sticky top-24 space-y-6">
            <Card className="p-4 bg-gradient-to-br from-zinc-900 to-black border-zinc-800">
               <h3 className="text-sm font-bold text-white mb-4">Trending Topics</h3>
               <div className="flex flex-wrap gap-2">
                  {['#LunarNewYear', '#UIUpdate', '#ServerMaint', '#Q1Goals'].map(tag => (
                     <span key={tag} className="text-xs px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                        {tag}
                     </span>
                  ))}
               </div>
            </Card>

            <div>
               <h3 className="px-1 text-xs font-semibold text-zinc-500 uppercase mb-3">Upcoming Events</h3>
               <div className="space-y-3">
                  <div className="flex gap-3 items-center group cursor-pointer">
                     <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 flex flex-col items-center justify-center text-zinc-400 group-hover:border-primary group-hover:text-primary transition-colors">
                        <span className="text-[10px] font-bold uppercase">Feb</span>
                        <span className="text-lg font-bold">15</span>
                     </div>
                     <div>
                        <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">All Hands Meeting</div>
                        <div className="text-xs text-zinc-500">10:00 AM • Main Hall</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
