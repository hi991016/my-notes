<?php 
function my_validation_rule( $Validation ) {
    $Validation->set_rule( 
        'choose', 'noempty', array('message' => '入力してください')
    );
    $Validation->set_rule( 
        'textarea', 'noempty', array('message' => '入力してください') 
    );
    $Validation->set_rule( 
        'email', 'noempty', array('message' => '入力してください') 
    );
    $Validation->set_rule( 
        'email', 'mail', array('message' => 'これはメールアドレスの形式ではありません。') 
    );
    $Validation->set_rule( 
        'tel', 'noempty', array('message' => '入力してください') 
    );
    $Validation->set_rule( 
        'tel', 'numeric', array('message' => '番号を入力してください') 
    );
    $Validation->set_rule( 
        'name', 'noempty', array('message' => '入力してください') 
    );
    return $Validation;
}
add_filter( 'mwform_validation_mw-wp-form-20', 'my_validation_rule' );

add_theme_support( 'post-thumbnails' );

add_action('init', 'create_post_works');
function create_post_works()
{
    register_post_type('works', array(
        'labels'        => array(
            'name'               => _x('works', 'Post type general name'),
            'singular_name'      => _x('works', 'Post type singular name'),
            'menu_name'          => _x('Works', ''),
            // 'all_items' => __('記事一覧'),
            'view_item'          => __('View Post'),
            // 'add_new_item' => __( '新規追加'),
            // 'add_new' => __( '新規追加'),
            'edit_item'          => __('Edit'),
            'update_item'        => __('Update'),
            'search_items'       => __('Search'),
            'not_found'          => __('No works Found'),
            'not_found_in_trash' => __('No works Found In Trash'),
            'parent_item_colon'  => '',
        ),
        'public'        => true,
        'taxonomies' => array('post_tag'),
        'rewrite'       => [
            'slug'       => 'works',
            'with_front' => false,
        ],
        'has_archive'   => true,
        'hierarchical'  => false,
        'show_ui'       => true,
        'show_in_menu'  => true,
        'menu_position' => 5,
        'supports'      => array(
            'title',
            'editor',
            // 'excerpt',
            'thumbnail',
            // 'comments'
        ),
    ));
}

// 投稿タイプ（works）用のカテゴリを作成する
add_action('init', 'create_works_taxonomies');
function create_works_taxonomies() {
	// カテゴリを作成
	$labels = array(
		'name'                => 'worksカテゴリ',
		'singular_name'       => 'worksカテゴリ',
		'search_items'        => 'worksカテゴリを検索',
		'all_items'           => '全てのworksカテゴリ',
		'parent_item'         => '親カテゴリ',
		'parent_item_colon'   => '親カテゴリ:',
		'edit_item'           => 'worksカテゴリを編集',
		'update_item'         => 'worksカテゴリを更新',
		'add_new_item'        => 'worksカテゴリを追加',
		'new_item_name'       => '新規worksカテゴリ',
		'menu_name'           => 'Worksカテゴリ'
	);
	$args = array(
		'hierarchical'        => true,
		'labels'              => $labels,
		'rewrite'             => array( 'slug' => 'works' )
	);
	register_taxonomy( 'works_tax', 'works', $args );
}

//タクソノミーページでのループの表示件数変更
add_action('pre_get_posts', 'my_pre_get_posts');
function my_pre_get_posts($query) {
	if (is_tax('works_tax')) {
		$query->set('posts_per_page', 24);
	}
}

//Intvew用のループ
function main_loop($query){
	if (is_admin() || !$query->is_main_query()) {
		return;
	}
	
	if ($query->is_post_type_archive('works')) {
		
		$query->set('posts_per_page', 24);
		$query->set( 'meta_query',
			array(
				'relation' => 'OR',

				array(
					'key' => 'show_index',
					'value' => '',
					'compare' => 'NOT EXISTS'
				),
				array(
					'key' => 'show_index',
					'value' => 'show',
					'compare' => 'NOT LIKE'
				)
			)
		);
		return;
	}
}

function hocwp_taxonomy_slug_rewrite($wp_rewrite) {
    $rules = array();
    $taxonomies = get_taxonomies(array('_builtin' => false), 'objects');
    $post_types = get_post_types(array('public' => true, '_builtin' => false), 'objects');
    foreach($post_types as $post_type) {
        foreach($taxonomies as $taxonomy) {
            foreach($taxonomy->object_type as $object_type) {
                if($object_type == $post_type->rewrite['slug']) {
                    $terms = get_categories(array('type' => $object_type, 'taxonomy' => $taxonomy->name, 'hide_empty' => 0));
                    foreach($terms as $term) {
                        $rules[$object_type . '/' . $term->slug . '/?$'] = 'index.php?' . $term->taxonomy . '=' . $term->slug;
                    }
                }
            }
        }
    }
    $wp_rewrite->rules = $rules + $wp_rewrite->rules;
}
add_filter('generate_rewrite_rules', 'hocwp_taxonomy_slug_rewrite');

add_filter('wpcf7_autop_or_not', '__return_false');
?>
